import time
import schedule
import subprocess
import logging
from pathlib import Path

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("Scheduler")

def job_ceo_briefing():
    logger.info("Running Weekly CEO Briefing Task...")
    # Trigger Claude to generate the briefing
    # cmd = "claude 'Generate Monday Morning CEO Briefing' --cwd './AI_Employee_Vault'"
    # subprocess.run(cmd, shell=True)
    logger.info("Briefing task completed.")

def job_daily_audit():
    logger.info("Running Daily Audit Task...")
    logger.info("Audit completed.")

# Schedule tasks
schedule.every().monday.at("07:00").do(job_ceo_briefing)
schedule.every().day.at("22:00").do(job_daily_audit)

if __name__ == "__main__":
    logger.info("Scheduler started. Waiting for jobs...")
    while True:
        schedule.run_pending()
        time.sleep(60)
