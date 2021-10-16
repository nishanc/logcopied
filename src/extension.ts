import * as vscode from 'vscode';
export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('logcopied.log', () => {
		vscode.env.clipboard.readText().then((text)=>{
			if(/['||"]/.test(text)){
				vscode.window
					.showWarningMessage(
						"Woah! that contains quotation marks, do you want to remove them?",
						...["Yes", "No"]
					)
					.then((answer) => {
						if (answer === "Yes") {
							paste(text.replace(/["']/g, ""));
						} else {
							paste(text);
						}
					});
			} else {
				paste(text);
			}
			
		});
	});

	context.subscriptions.push(disposable);
}

function paste(text: string) {
	const editor = vscode.window.activeTextEditor;
	let toPaste = `console.log("${text}", ${text});`;

	if (editor) {
		editor.edit(editBuilder => {
			editBuilder.insert(editor.selection.active, toPaste);
		});
	} else {
		vscode.window.showErrorMessage("Can't find an active editor to paste, land your cursur on a document first");
	}
}

export function deactivate() {}