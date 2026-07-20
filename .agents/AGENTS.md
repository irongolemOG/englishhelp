# English Web Agent Rules

## Git Push Automation
Whenever changes are successfully made to the codebase and the user's primary requests for the session are completed, the AI must:
1. Briefly summarize the changes made.
2. Ask the user for explicit approval to publish the changes to GitHub.
3. Upon receiving a "yes" or similar approval from the user, the AI must automatically execute the following commands in order using `run_command` (if the AI has the ability to run commands):
   - `git add .`
   - `git commit -m "Update codebase based on user request"`
   - `git push origin main` (or the respective branch)

This ensures the user's codebase is safely synchronized with the remote repository after every coding session.
