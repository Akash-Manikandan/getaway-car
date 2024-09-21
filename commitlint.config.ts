module.exports = {
  rules: {
    'commit-pattern-check': [2, 'always'],
  },
  plugins: [
    {
      rules: {
        'commit-pattern-check': ({ header }) => {
          /*
           * Commit Msg Pattern - <Board>-<Ticket No>:<Type><space><Commit Msg>
           * Example: 'BUP-2345:[feat] your commit message'
           * Board: AKKN or BUP
           * Commit Types definitions:
           * [feat] - A new feature (adding a new feature)
           * [config] - App config level changes (adding new packages, configs)
           * [style] - style changes (any style file change)
           * [fix] - Bug fixes (any bug fixes done as part of bug tickets)
           * [resolve] - Resolving comments (when resolving PR comments)
           * [merge] - Merging a PR (when merging a PR)
           */
          const regExp =
            /^(feat|fix|docs|style|refactor|test|chore) - [A-Z]+-[0-9]+ - .{1,60}$/;
          return [
            regExp.test(header),
            `Commit message is not in expected format.` +
              `Eg: BUP-2345:[style|config|feat|fix|resolve|merge] your commit message`,
          ];
        },
      },
    },
  ],
};
