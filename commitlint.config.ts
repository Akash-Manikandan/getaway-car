module.exports = {
  rules: {
    'commit-pattern-check': [2, 'always'],
  },
  plugins: [
    {
      rules: {
        'commit-pattern-check': ({ header }) => {
          const regExp =
            /^(feat|fix|docs|style|refactor|test|chore) - [A-Z]+-[0-9]+ - .{1,60}$/;
          return [
            regExp.test(header),
            `Error: Commit message format is incorrect.
             It should be: "<type> - <ticket> - <description>"
             Example: "feat - PROJ-123 - Add user authentication"
             Types: "feat, fix, docs, style, refactor, test, chore"
             Ticket: Project key followed by number (e.g., PROJ-123)
             Description: Brief summary (max 60 characters)`,
          ];
        },
      },
    },
  ],
};
