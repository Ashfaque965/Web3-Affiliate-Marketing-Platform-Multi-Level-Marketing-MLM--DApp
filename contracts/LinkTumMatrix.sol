// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title LinkTum Matrix Network Engine
 * @dev Fully decentralized on-chain MLM Matrix protocol processing multi-tier x4 and xXx programs.
 */
contract LinkTumMatrix is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    struct User {
        uint256 id;
        address referrer;
        uint256 partnersCount;
        mapping(uint8 => mapping(uint256 => bool)) activeMatrixLevels;
        mapping(uint8 => mapping(uint256 => uint256)) matrixFilledSlots;
    }

    // --- State Variables ---
    IERC20 public immutable tokenContract;
    uint256 public registrationPrice;
    uint256 public lastUserId;
    address public rootNodeAddress;

    // Mapping maps user addresses directly to historical profile states
    mapping(address => User) public users;
    mapping(uint256 => address) public userIds;

    // Pricing maps pointing program ID -> level tier -> quantitative cost
    mapping(uint8 => mapping(uint256 => uint256)) public levelCosts;

    // --- System Constant Architecture Flags ---
    uint8 public constant X4_PROGRAM_ID = 1;
    uint8 public constant XXX_PROGRAM_ID = 2;
    uint256 public constant MAX_LEVEL_TIER = 12;

    // --- Structural Events Event Logs ---
    event NewUserRegistration(address indexed user, address indexed referrer, uint256 indexed userId, uint256 referrerId);
    event UpgradeMatrixTier(address indexed user, uint8 indexed programId, uint256 indexed levelTier, uint256 transactionCost);
    event MatrixSlotFilled(address indexed user, address indexed referral, uint8 indexed programId, uint256 levelTier, uint256 totalSlotsFilled);
    event RegistrationPriceChanged(uint256 oldPrice, uint256 newPrice);
    event EmergencyFundsEvacuated(address indexed recipient, uint256 quantAmount);

    /**
     * @dev Initializes core parameters, pricing tiers, and configures root user #1 node ID.
     */
    constructor(address _tokenAddress, uint256 _initialRegPrice) Ownable(msg.sender) {
        require(_tokenAddress != address(0), "Invalid token deployment address link");
        tokenContract = IERC20(_tokenAddress);
        registrationPrice = _initialRegPrice;
        rootNodeAddress = msg.sender;
        
        // Setup initial user counters
        lastUserId++;
        userIds[lastUserId] = msg.sender;
        
        User storage rootUser = users[msg.sender];
        rootUser.id = lastUserId;
        rootUser.referrer = address(0);

        // Populate base pricing matrix arrays configurations
        // Program x4 Initialization parameters
        levelCosts[X4_PROGRAM_ID][1] = 10 * 10**18;
        levelCosts[XXX_PROGRAM_ID][1] = 15 * 10**18;

        for (uint256 i = 2; i <= MAX_LEVEL_TIER; i++) {
            levelCosts[X4_PROGRAM_ID][i] = levelCosts[X4_PROGRAM_ID][i - 1] * 2;
            levelCosts[XXX_PROGRAM_ID][i] = levelCosts[XXX_PROGRAM_ID][i - 1] * 2;
        }

        // Auto-activate all tiers for root nodes to bypass routing failure states
        for (uint256 i = 1; i <= MAX_LEVEL_TIER; i++) {
            users[msg.sender].activeMatrixLevels[X4_PROGRAM_ID][i] = true;
            users[msg.sender].activeMatrixLevels[XXX_PROGRAM_ID][i] = true;
        }
    }

    /**
     * @notice Onboard new users into the matrix hierarchy mapping layers.
     * @param _referrerAddress Address of upstream inviter network node.
     */
    function registrationExt(address _referrerAddress) external nonReentrant {
        require(!isUserExists(msg.sender), "Wallet signature already allocated to a network node");
        require(isUserExists(_referrerAddress) || _referrerAddress == address(0), "Target referer is not deployed inside live networks");

        address actualReferrer = _referrerAddress == address(0) ? rootNodeAddress : _referrerAddress;
        
        // Escrow entry fee validation parameters
        tokenContract.safeTransferFrom(msg.sender, actualReferrer, registrationPrice);

        lastUserId++;
        userIds[lastUserId] = msg.sender;

        User storage newUser = users[msg.sender];
        newUser.id = lastUserId;
        newUser.referrer = actualReferrer;

        users[actualReferrer].partnersCount++;

        // Base entry layer allocation: Auto-activate Level 1 of x4 and xXx programs
        newUser.activeMatrixLevels[X4_PROGRAM_ID][1] = true;
        newUser.activeMatrixLevels[XXX_PROGRAM_ID][1] = true;

        // Propagate structural metrics upward across network channels
        _fillMatrixSlot(msg.sender, actualReferrer, X4_PROGRAM_ID, 1);
        _fillMatrixSlot(msg.sender, actualReferrer, XXX_PROGRAM_ID, 1);

        emit NewUserRegistration(msg.sender, actualReferrer, lastUserId, users[actualReferrer].id);
    }

    /**
     * @notice Purchase higher tier slots inside matrix structures.
     * @param _programId target system identifier (1 = x4, 2 = xXx)
     * @param _level Level tier matrix identifier to unlock (Levels 1 to 12)
     */
    function buyNewLevel(uint8 _programId, uint256 _level) external nonReentrant {
        require(isUserExists(msg.sender), "Must establish user registration profile footprint first");
        require(_programId == X4_PROGRAM_ID || _programId == XXX_PROGRAM_ID, "Target network program identifier does not exist");
        require(_level > 1 && _level <= MAX_LEVEL_TIER, "Invalid target tier parameters");
        require(!users[msg.sender].activeMatrixLevels[_programId][_level], "Target tier level contains active allocation status");
        require(users[msg.sender].activeMatrixLevels[_programId][_level - 1], "Preceding sequential hierarchy must be activated first");

        uint256 upgradeCost = levelCosts[_programId][_level];
        address uplineReceiver = users[msg.sender].referrer;

        // Route funds directly to referrer node
        tokenContract.safeTransferFrom(msg.sender, uplineReceiver, upgradeCost);

        users[msg.sender].activeMatrixLevels[_programId][_level] = true;
        _fillMatrixSlot(msg.sender, uplineReceiver, _programId, _level);

        emit UpgradeMatrixTier(msg.sender, _programId, _level, upgradeCost);
    }

    /**
     * @notice External read tool returning the structural fill state of active user nodes.
     */
    function getUserMatrixState(address _userAddress, uint8 _programId, uint256 _level) external view returns (bool active, uint256 filledSlots) {
        return (
            users[_userAddress].activeMatrixLevels[_programId][_level],
            users[_userAddress].matrixFilledSlots[_programId][_level]
        );
    }

    /**
     * @notice Safe utility function to check for historical profile configurations.
     */
    function isUserExists(address _user) public view returns (bool) {
        return (users[_user].id != 0);
    }

    // --- Admin Control Implementations ---

    function changeRegistrationPrice(uint256 _newPrice) external onlyOwner {
        emit RegistrationPriceChanged(registrationPrice, _newPrice);
        registrationPrice = _newPrice;
    }

    function failSafeTransfer(address _receiver, uint256 _amount) external onlyOwner {
        require(_receiver != address(0), "Invalid emergency recipient target");
        tokenContract.safeTransfer(_receiver, _amount);
        emit EmergencyFundsEvacuated(_receiver, _amount);
    }

    // --- Internal Worker Methods ---

    function _fillMatrixSlot(address _referral, address _upline, uint8 _programId, uint256 _level) internal {
        if (_upline == address(0)) return;

        uint256 totalMaxSlots = _programId == XXX_PROGRAM_ID ? 14 : 6;

        if (users[_upline].matrixFilledSlots[_programId][_level] < totalMaxSlots) {
            users[_upline].matrixFilledSlots[_programId][_level]++;
            emit MatrixSlotFilled(_upline, _referral, _programId, _level, users[_upline].matrixFilledSlots[_programId][_level]);
        } else {
            // Recycling Logic Trigger: Matrix structural layout has hit physical maximum bounds
            users[_upline].matrixFilledSlots[_programId][_level] = 0;
            emit MatrixSlotFilled(_upline, _referral, _programId, _level, 0);
        }
    }
}