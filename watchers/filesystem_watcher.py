import shutil
from pathlib import Path
from base_watcher import BaseWatcher

class FileSystemWatcher(BaseWatcher):
    def __init__(self, vault_path: str, inbox_path: str):
        super().__init__(vault_path, check_interval=2)
        self.inbox_path = Path(inbox_path)
        self.inbox_path.mkdir(parents=True, exist_ok=True)
        
    def check_for_updates(self) -> list:
        # Get all files in the inbox that aren't .md and aren't hidden
        return [f for f in self.inbox_path.iterdir() if f.is_file() and not f.name.startswith('.')]
    
    def create_action_file(self, source_file: Path) -> Path:
        dest_filename = f'FILE_{source_file.name}'
        dest_path = self.needs_action / dest_filename
        
        # Copy file to Needs_Action (keeping it as original for context)
        shutil.move(str(source_file), str(dest_path))
        
        # Create metadata .md file
        meta_path = dest_path.with_suffix('.md')
        content = f'''---
type: file_drop
original_name: {source_file.name}
size: {dest_path.stat().st_size}
status: pending
---

## File Dropped
A new file `{source_file.name}` has been dropped into the inbox for processing.

## AI Suggestions
- [ ] Analyze file content
- [ ] Classify and move to appropriate vault folder
- [ ] Summarize if it is a document
'''
        meta_path.write_text(content)
        self.logger.info(f'Processed file drop: {source_file.name}')
        return meta_path

if __name__ == "__main__":
    # Example usage
    import sys
    if len(sys.argv) > 1:
        vault = sys.argv[1]
    else:
        vault = "../AI_Employee_Vault"
        
    inbox = Path(vault) / "Inbox"
    watcher = FileSystemWatcher(vault, str(inbox))
    watcher.run()
