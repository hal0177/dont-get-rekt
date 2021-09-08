# Don't Get Rekt

:skull_and_crossbones: :skull_and_crossbones: :skull_and_crossbones:

## To undo unwanted approvals ...

### Install dependencies and create a secure file:

```bash
npm install
touch .env
```

### Add the following to .env with relevant info:

```
# Gateway URL
GATE="https://bsc-dataseed1.binance.org/"

# Private Key
PK="0xabcdef01abcdef01abcdef01abcdef01abcdef01abcdef01abcdef01abcdef01"

# Transaction Hash of Approval TX
TX="0xabcdef01abcdef01abcdef01abcdef01abcdef01abcdef01abcdef01abcdef01"
```

### Finally:

```bash
npm start
```

### Good Luck.