import * as vscode from 'vscode';
import { searchSnippetsEnhanced, getAllSnippets } from './services/searchService';

export function activate(context: vscode.ExtensionContext) {

    // ── Main search command ────────────────────────────────────────────
    const searchDisposable = vscode.commands.registerCommand(
        'openguido.searchSnippet',
        async () => {

            const query = await vscode.window.showInputBox({
                placeHolder: 'Search syntax, command, snippet... (fuzzy search)'
            });

            if (!query) {
                return;
            }

            // Use the enhanced V3 search pipeline
            const results = searchSnippetsEnhanced(query, { maxResults: 30 });

            if (results.length === 0) {
                vscode.window.showInformationMessage(
                    'No snippets found.'
                );
                return;
            }

            const items = results.map((result, index) => {
                const s = result.snippet;
                // Visual indicator of match quality
                const icon = result.matchType === 'exact' ? '$(check)'
                    : result.matchType === 'intent' ? '$(lightbulb)'
                    : result.matchType === 'alias' ? '$(link)'
                    : result.matchType === 'prefix' ? '$(ellipsis)'
                    : '$(search)';

                // Build detail line with available metadata
                const parts: string[] = [s.language];
                if (s.category) { parts.push(s.category); }
                if (s.difficulty) { parts.push(`[${s.difficulty}]`); }
                if (result.score < 1) { parts.push(`${Math.round(result.score * 100)}%`); }

                return {
                    label: `${icon} ${s.title}`,
                    description: s.description,
                    detail: parts.join(' • '),
                    index,
                };
            });

            const selected = await vscode.window.showQuickPick(items, {
                matchOnDescription: true,
                matchOnDetail: true,
            });

            if (!selected) {
                return;
            }

            const snippet = results[selected.index].snippet;

            const actions = snippet.type === 'code'
                ? ['Preview Snippet', 'Copy To Clipboard', 'Insert Into Editor']
                : ['Preview Command', 'Copy To Clipboard'];

            const action = await vscode.window.showQuickPick(actions);

            if (!action) {
                return;
            }

            if (action === 'Preview Snippet' || action === 'Preview Command') {
                vscode.window.showInformationMessage(snippet.code);
            }

            if (action === 'Copy To Clipboard') {
                await vscode.env.clipboard.writeText(snippet.code);
                vscode.window.showInformationMessage('Snippet copied to clipboard!');
            }

            if (action === 'Insert Into Editor') {
                const editor = vscode.window.activeTextEditor;
                if (!editor) {
                    vscode.window.showErrorMessage('No active editor found.');
                    return;
                }
                editor.edit(editBuilder => {
                    editBuilder.insert(editor.selection.active, snippet.code);
                });
            }
        }
    );

    // ── Statistics command ─────────────────────────────────────────────
    const statsDisposable = vscode.commands.registerCommand(
        'openguido.showStats',
        () => {
            const allSnippets = getAllSnippets();

            const byLanguage = new Map<string, number>();
            const byCategory = new Map<string, number>();

            for (const s of allSnippets) {
                byLanguage.set(s.language, (byLanguage.get(s.language) || 0) + 1);
                if (s.category) {
                    byCategory.set(s.category, (byCategory.get(s.category) || 0) + 1);
                }
            }

            const total = allSnippets.length;
            const langStats = Array.from(byLanguage.entries())
                .sort((a, b) => b[1] - a[1])
                .map(([lang, count]) => `  ${lang}: ${count}`)
                .join('\n');

            const catStats = Array.from(byCategory.entries())
                .sort((a, b) => b[1] - a[1])
                .map(([cat, count]) => `  ${cat}: ${count}`)
                .join('\n');

            vscode.window.showInformationMessage(
                `OpenGuido Database — ${total} snippets total`,
                { modal: true, detail: `Languages:\n${langStats}\n\nCategories:\n${catStats}` }
            );
        }
    );

    context.subscriptions.push(searchDisposable, statsDisposable);
}

export function deactivate() { }
