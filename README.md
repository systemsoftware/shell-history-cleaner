# Shell History Cleaner

A simple Electron application that helps you quickly clear your shell history (Zsh, Bash, or custom shell).

## Description

Shell History Cleaner is a desktop utility that provides a graphical interface for clearing your shell history files. It supports:
- Zsh history
- Bash history
- Or enter a custom shell type

## Installation

1. Clone this repository
2. Install dependencies (optional for custom shell input):
```bash
npm install
```

Required dependencies:
- electron (dev dependency)
- electron-prompt (optional for custom shell input)

## Usage

Run the application:
```bash
npm start
```
Or build the application for your platform.

The application will:
1. Present a dialog box asking you to choose your shell type
2. For custom shell types, prompt for the shell name
3. Attempt to clear the history file in your home directory
4. Notify you of success or failure
5. Automatically close after completion

## File Locations

The application looks for history files in the following locations:
- Zsh: `~/.zsh_history`
- Bash: `~/.bash_history`
- Custom: `~/.{custom_name}_history`

## Error Handling

The application will:
- Check if the history file exists before attempting to clear it
- Display an error message if the file is not found
- Show any other errors that occur during operation

## Technical Details

- Built with Electron
- Uses native dialog boxes for user interaction
- Requires filesystem access to your home directory
- Zero-writes the history file (doesn't delete the file)

## Security Note

This application modifies shell history files in your home directory. Make sure you want to clear your shell history before running it, as this action cannot be undone.

## License

MIT

## Contributing

Feel free to submit issues and pull requests.