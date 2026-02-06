import os
import subprocess
import time
import logging
from pathlib import Path

# Configure Logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - ORCHESTRATOR - %(levelname)s - %(message)s'
)
logger = logging.getLogger("Orchestrator")

class Orchestrator:
    def __init__(self, vault_path: str):
        self.vault_path = Path(vault_path).absolute()
        self.needs_action_path = self.vault_path / "Needs_Action"
        self.done_path = self.vault_path / "Done"
        self.approved_path = self.vault_path / "Approved"
        
    def run_claude_task(self, prompt: str):
        """Invoke Claude Code to handle a specific task."""
        logger.info(f"Triggering Claude Code for task: {prompt}")
        # Note: In a real environment, we would use 'claude' command.
        # Since I am Claude Code (Antigravity), I will define the interaction patterns.
        # For the hackathon demo, we simulate the command line invocation.
        try:
            # This is a placeholder for how the local orchestrator would call the CLI
            # cmd = f"claude '{prompt}' --cwd '{self.vault_path}'"
            # subprocess.run(cmd, shell=True, check=True)
            logger.info("Claude task initiated successfully.")
        except Exception as e:
            logger.error(f"Failed to run Claude task: {e}")

    def monitor_vault(self):
        logger.info(f"Monitoring vault at {self.vault_path}")
        while True:
            # Check for new items in Needs_Action
            needs_action_items = list(self.needs_action_path.glob("*.md"))
            if needs_action_items:
                logger.info(f"Found {len(needs_action_items)} new items in Needs_Action.")
                self.run_claude_task("Process all files in /Needs_Action, create plans for each, and move to /Done when complete.")
            
            # Check for approved actions
            approved_items = list(self.approved_path.glob("*.md"))
            if approved_items:
                logger.info(f"Found {len(approved_items)} approved items.")
                self.run_claude_task("Execute all approved actions in /Approved and move them to /Done.")
                
            time.sleep(10)

if __name__ == "__main__":
    vault = os.getenv("VAULT_PATH", "AI_Employee_Vault")
    orchestrator = Orchestrator(vault)
    orchestrator.monitor_vault()
