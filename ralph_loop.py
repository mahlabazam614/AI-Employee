import os
import subprocess
import time
import logging
from pathlib import Path

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("RalphLoop")

class RalphWiggum:
    def __init__(self, target_task_file: str, max_iterations: int = 10):
        self.target_task_file = Path(target_task_file)
        self.max_iterations = max_iterations
        self.iteration = 0

    def is_task_done(self) -> bool:
        # Check if the signal/plan has been moved to /Done
        # Or if the status in the file is 'complete'
        if not self.target_task_file.exists():
            # If it's gone, assume it was moved to /Done
            return True
        
        content = self.target_task_file.read_text()
        return "status: complete" in content.lower()

    def run_loop(self, prompt: str):
        logger.info(f"Starting Ralph Loop for: {prompt}")
        
        while self.iteration < self.max_iterations:
            self.iteration += 1
            logger.info(f"--- Iteration {self.iteration} ---")
            
            # Simulate invoking Claude with the prompt
            # cmd = f"claude '{prompt}'"
            # result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
            
            # For demo purposes, we check the 'task file' state
            if self.is_task_done():
                logger.info("Task completion detected! Loop ending.")
                return True
            
            logger.info("Task not yet complete. Re-injecting prompt...")
            # In a real Ralph loop, we would pass the previous output back to Claude
            time.sleep(2)
            
        logger.warning("Max iterations reached without completion.")
        return False

if __name__ == "__main__":
    # Example usage: Watch a plan file until it's marked complete
    plan_file = "AI_Employee_Vault/Plans/PLAN_test_task.md"
    # Create the test file for the demo
    Path(plan_file).parent.mkdir(parents=True, exist_ok=True)
    Path(plan_file).write_text("---\nstatus: pending\n---\nInitial task state.")
    
    ralph = RalphWiggum(plan_file)
    logger.info("Simulating Ralph Loop. In actual use, external actions would update the status.")
    # In this demo, it will hit max iterations unless we manually change the file.
    # ralph.run_loop("Keep working on PLAN_test_task.md until status is complete.")
