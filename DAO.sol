// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "./interfaces/IToken.sol";

contract DAO is AccessControl {
    IToken public immutable governanceToken;

    enum ProposalStatus { Active, Defeated, Passed, Executed }

    struct Proposal {
        address proposer;
        string description;
        uint256 votesFor;
        uint256 votesAgainst;
        uint256 deadline;
        ProposalStatus status;
        mapping(address => bool) hasVoted;
    }

    Proposal[] public proposals;
    uint256 public constant VOTING_PERIOD = 7 days;
    uint256 public constant MINIMUM_QUORUM = 100000 * 10**18; // 100k tokens required

    event ProposalCreated(uint256 indexed proposalId, address indexed proposer, string description);
    event VoteCast(uint256 indexed proposalId, address indexed voter, bool support, uint256 weight);
    event ProposalExecuted(uint256 indexed proposalId);

    constructor(address _governanceToken) {
        governanceToken = IToken(_governanceToken);
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function createProposal(string calldata description) external returns (uint256) {
        require(governanceToken.balanceOf(msg.sender) >= 1000 * 10**18, "Must hold at least 1,000 tokens to propose");

        uint256 proposalId = proposals.length;
        Proposal storage newProposal = proposals.push();
        newProposal.proposer = msg.sender;
        newProposal.description = description;
        newProposal.deadline = block.timestamp + VOTING_PERIOD;
        newProposal.status = ProposalStatus::Active;

        emit ProposalCreated(proposalId, msg.sender, description);
        return proposalId;
    }

    function castVote(uint256 proposalId, bool support) external {
        Proposal storage proposal = proposals[proposalId];
        require(block.timestamp < proposal.deadline, "Voting period has ended");
        require(!proposal.hasVoted[msg.sender], "Already voted on this proposal");

        uint256 voteWeight = governanceToken.balanceOf(msg.sender);
        require(voteWeight > 0, "No voting power available");

        if (support) {
            proposal.votesFor += voteWeight;
        } else {
            proposal.votesAgainst += voteWeight;
        }

        proposal.hasVoted[msg.sender] = true;
        emit VoteCast(proposalId, msg.sender, support, voteWeight);
    }

    function queueAndExecute(uint256 proposalId) external onlyRole(DEFAULT_ADMIN_ROLE) {
        Proposal storage proposal = proposals[proposalId];
        require(block.timestamp >= proposal.deadline, "Voting period still open");
        require(proposal.status == ProposalStatus::Active, "Proposal not in active state");
        require(proposal.votesFor + proposal.votesAgainst >= MINIMUM_QUORUM, "Quorum threshold unmet");

        if (proposal.votesFor > proposal.votesAgainst) {
            proposal.status = ProposalStatus::Passed;
            // Execute proposal logic here (e.g. interacting with an external contract upgrade manager)
            proposal.status = ProposalStatus::Executed;
            emit ProposalExecuted(proposalId);
        } else {
            proposal.status = ProposalStatus::Defeated;
        }
    }
}