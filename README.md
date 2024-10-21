## WebSocket DataFrame Example

| MESSAGE | BYTE SEQUENCE                 |
| ------- | ----------------------------- |
| MDN     | 129 131 61 84 35 6 112 16 109 | (in decimal)

#### First Byte (FIN, RSV, OPCODE)
The first byte helps the WebSocket understand what kind of data is coming, whether it’s a text message, binary data, or a command like closing the connection.
| BUFFER | BIT   | REPRESENTS     | ABOUT                                                                                                        |
| ------ | ----- | -------------- | ------------------------------------------------------------------------------------------------------------ |
| 1      |  7    | FIN            | Final Frame: Indicates if this is the final fragment in a message. 1 means final, 0 means more frames follow |
|        |  6    | RSV1           | Reserved: Must be 0 unless an extension defines otherwise.                                                   |
|        |  5    | RSV2           | Reserved: Must be 0 unless an extension defines otherwise.                                                   |
|        |  4    | RSV3           | Reserved: Must be 0 unless an extension defines otherwise.                                                   |
|        |  3-0  | OPCODE         | Operation Code: Defines the frame type. Common values:                                                       |
|        |       |                | - 0x1 (0001): Text frame                                                                                     |
|        |       |                | - 0x2 (0010): Binary frame                                                                                   |
|        |       |                | - 0x8 (1000): Connection close                                                                               |
|        |       |                | - 0x9 (1001): Ping                                                                                           |
|        |       |                | - 0xA (1010): Pong                                                                                           |

#### Second Byte (MASK, Payload Length)
This byte tells how long the message is and whether the message is scrambled (masked) or not.
| BUFFER | BIT   | REPRESENTS     | ABOUT                                                                                                    |
| ------ | ----- | -------------- | -------------------------------------------------------------------------------------------------------- |
| 2      |  7    | MASK Indicator | Mask Indicator: 1 if payload is masked (client to server), 0 if not masked (server to client).           |
|        |  6-0  | Payload Length | Payload Length:                                                                                          |
|        |       |                | - 0-125: Actual payload length                                                                           |
|        |       |                | - 126: Payload length is a 16-bit unsigned integer in the next 2 bytes                                   |
|        |       |                | - 127: Payload length is a 64-bit unsigned integer in the next 8 bytes                                   |

#### Extended Payload Length (If Applicable)
If you're sending a very long message (more than 125 bytes), extra space (2 or 8 bytes) is used to describe how long the message is.
| BUFFER | BIT    | REPRESENTS               | ABOUT                                                                                                         |
| ------ | ------ | -----------------------  | ------------------------------------------------------------------------------------------------------------- |
| 3      | 0-15   | Extended Payload Length  | Present if the Payload Length is 126. It is a 16-bit unsigned integer representing the length of the payload. |
| 3-10   | 0-63   | Extended Payload Length	 | Present if the Payload Length is 127. It is a 64-bit unsigned integer representing the length of the payload. |

#### Masking Key (If MASK is Set to 1)
A masking key is used to hide the real message when it's sent from the client to the server. The server then "unmasks" it.
| ------ | ---- | ----------- | ------------------------------------------------------------------------------------------------------------|
| BUFFER | BIT  | REPRESENTS  | ABOUT                                                                                                       |
| 4-7    | 0-31 | Masking Key | The masking key consists of 4 bytes. It is XOR-ed with the payload data to retrieve the original message.   |

#### Payload Data
Actual data is stored.
| BUFFER   | BIT    | REPRESENTS   | ABOUT                                                                                                             |
| -------- | ------ | ------------ | ----------------------------------------------------------------------------------------------------------------- |
| Variable | 0-n    | Payload Data | The actual message content. If the MASK bit is set to 1, it is XOR-ed with the masking key to decode the message. |

## Resources
- https://datatracker.ietf.org/doc/html/rfc6455
- https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
- https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API