import os
import time
from pathlib import Path

def simulate_workflow():
    vault_path = Path("AI_Employee_Vault")
    inbox_path = vault_path / "Inbox"
    needs_action_path = vault_path / "Needs_Action"
    
    print("--- 📝 Step 1: Simulating File Drop ---")
    test_file = inbox_path / "invoice_123.txt"
    test_file.write_text("Invoice for Client X - $500.00")
    print(f"Created {test_file}")
    
    print("\n--- 👁️ Step 2: Running Filesystem Watcher (Manual Trigger for Demo) ---")
    # In a real setup, this runs as a daemon. 
    # We'll import and run a single iteration.
    from watchers.filesystem_watcher import FileSystemWatcher
    # Adjusting path for local execution
    watcher = FileSystemWatcher(str(vault_path), str(inbox_path))
    watcher.check_interval = 0 # No wait
    
    items = watcher.check_for_updates()
    for item in items:
        watcher.create_action_file(item)
    
    print("\n--- ✅ Step 3: Checking Needs_Action Folder ---")
    signals = list(needs_action_path.glob("*.md"))
    for s in signals:
        print(f"Signal detected: {s.name}")
        print(f"Content Preview:\n{s.read_text()[:100]}...")

if __name__ == "__main__":
    if not os.path.exists("AI_Employee_Vault"):
        print("Error: Vault doesn't exist. Run initialization first.")
    else:
        # Temporary PYTHONPATH fix
        import sys
        sys.path.append(os.path.join(os.getcwd(), 'watchers'))
        simulate_workflow()
