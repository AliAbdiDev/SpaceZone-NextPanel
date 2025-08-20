#!/usr/bin/env bash
#
# git-tools.sh — Git branch deletion utilities
#
# This script provides utilities for deleting Git branches safely and consistently,
# both locally and remotely, based on their merge status.
#
# Usage with PowerShell:
#   This script is designed to be called from a PowerShell function named `git_branch`.
#   To prevent accidental deletions, the PowerShell function requires the `-Delete` flag.
#
# PowerShell Usage:
#   git_branch <command> <branch> -Delete
#
# Commands:
#   local       Delete a local branch (only if it has been merged)
#   remote      Delete a remote branch from origin
#   merged      Delete both local and remote branches (only if merged)
#   unmerged    Force delete local and remote branches (even if not merged)
#
# Examples:
#   git_branch local feature/login -Delete
#     → Deletes the local branch `feature/login` if it has been merged.
#
#   git_branch remote feature/login -Delete
#     → Deletes the remote branch `feature/login`.
#
#   git_branch merged feature/login -Delete
#     → Deletes both local and remote `feature/login` if it has been merged.
#
#   git_branch unmerged feature/login -Delete
#     → Force deletes both local and remote `feature/login` even if it has not been merged.
#
# Bash-only usage (if running without PowerShell):
#   bash scripts/git-tools.sh <command> <branch>
#
# Example:
#   bash scripts/git-tools.sh remote feature/login
#
# PowerShell Usage Guide for git_branch function:
#
# Define this function in your PowerShell profile ($PROFILE) by adding:
#
# function git_branch {
#     param (
#         [Parameter(Position=0)] [ValidateSet("local", "remote", "merged", "unmerged")] [string]$cmd,
#         [Parameter(Position=1)] [string]$branch,
#         [switch]$Delete
#     )
#
#     if (-not $Delete) {
#         Write-Host "You must pass -Delete to confirm branch deletion." -ForegroundColor Yellow
#         Write-Host "Usage: git_branch {local|remote|merged|unmerged} <branch> -Delete"
#         return
#     }
#
#     if (-not $branch) {
#         Write-Host "Branch name is required." -ForegroundColor Red
#         return
#     }
#
#     $bashPath   = "C:\Program Files\Git\bin\bash.exe"
#     $scriptPath = "J:/dev/projects/agroyar-front/scripts/git-tools.sh"
#
#     Write-Host "Deleting branch '$branch' with command '$cmd'..."
#     & $bashPath $scriptPath $cmd $branch
# }
#
# Usage examples:
#
# # Delete a local branch if merged
# git_branch local feature/login -Delete
#
# # Delete a remote branch
# git_branch remote feature/login -Delete
#
# # Delete both local and remote branches if merged
# git_branch merged feature/login -Delete
#
# # Force delete both local and remote branches even if not merged
# git_branch unmerged feature/login -Delete
#


set -e

cmd=$1
branch=$2

if [[ -z "$cmd" || -z "$branch" ]]; then
  echo "Usage: $0 {local|remote|merged|unmerged} <branch>"
  exit 1
fi

case "$cmd" in
  local)
    echo "Removing (deleting) local branch '$branch' if it has been merged..."
    git branch -d "$branch" && echo "Branch '$branch' has been successfully removed locally." || echo " Branch '$branch' is not merged. Use 'merged' or 'unmerged' commands to force delete."
    ;;
  remote)
    echo "Removing (deleting) remote branch '$branch' from GitHub..."
    git push origin --delete "$branch" && echo "Branch '$branch' has been successfully removed from remote."
    ;;
  merged)
    echo "Removing (deleting) branch '$branch' locally and remotely (if merged)..."
    git branch -d "$branch" && git push origin --delete "$branch" && echo "Branch '$branch' has been successfully removed both locally and remotely." || echo " Branch '$branch' is not merged. Use 'unmerged' to force delete."
    ;;
  unmerged)
    echo "Force removing (force deleting) branch '$branch' locally and remotely..."
    git branch -D "$branch" && git push origin --delete "$branch" && echo "Branch '$branch' has been forcefully removed both locally and remotely."
    ;;
  *)
    echo "Unknown command: $cmd"
    echo "Commands: local, remote, merged, unmerged"
    exit 1
    ;;
esac
