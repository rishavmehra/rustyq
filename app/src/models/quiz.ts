export type Quiz = {
  "version": "0.1.0",
  "name": "quiz",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "quizAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "quiz",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "question",
          "type": "string"
        },
        {
          "name": "response",
          "type": "string"
        },
        {
          "name": "a1",
          "type": "string"
        },
        {
          "name": "a2",
          "type": "string"
        },
        {
          "name": "a3",
          "type": "string"
        },
        {
          "name": "a4",
          "type": "string"
        }
      ]
    },
    {
      "name": "update",
      "accounts": [
        {
          "name": "quizAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "quiz",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "question",
          "type": "string"
        },
        {
          "name": "response",
          "type": "string"
        },
        {
          "name": "a1",
          "type": "string"
        },
        {
          "name": "a2",
          "type": "string"
        },
        {
          "name": "a3",
          "type": "string"
        },
        {
          "name": "a4",
          "type": "string"
        }
      ]
    },
    {
      "name": "answer",
      "accounts": [
        {
          "name": "quiz",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "response",
          "type": "string"
        }
      ]
    },
    {
      "name": "delete",
      "accounts": [
        {
          "name": "quizAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "quiz",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "question",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "quiz",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "isAnswered",
            "type": "bool"
          },
          {
            "name": "quizAuthor",
            "type": "publicKey"
          },
          {
            "name": "question",
            "type": "string"
          },
          {
            "name": "response",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "a1",
            "type": "string"
          },
          {
            "name": "a2",
            "type": "string"
          },
          {
            "name": "a3",
            "type": "string"
          },
          {
            "name": "a4",
            "type": "string"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "statistic",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "player",
            "type": "publicKey"
          },
          {
            "name": "correct",
            "type": "u64"
          },
          {
            "name": "incorrect",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "QuestionTooLong",
      "msg": "Cannot initialize, question too long"
    },
    {
      "code": 6001,
      "name": "AnswerTooLong",
      "msg": "Cannot initialize, answer too long"
    },
    {
      "code": 6002,
      "name": "AddressNotValid",
      "msg": "Address that created the quiz cannot answer it"
    },
    {
      "code": 6003,
      "name": "OwnerNotValid",
      "msg": "Only the quiz owner can modify its data"
    },
    {
      "code": 6004,
      "name": "IncorrectAnswer",
      "msg": "The provided answer is incorrect"
    }
  ]
};

export const IDL: Quiz = {
  "version": "0.1.0",
  "name": "quiz",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "quizAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "quiz",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "question",
          "type": "string"
        },
        {
          "name": "response",
          "type": "string"
        },
        {
          "name": "a1",
          "type": "string"
        },
        {
          "name": "a2",
          "type": "string"
        },
        {
          "name": "a3",
          "type": "string"
        },
        {
          "name": "a4",
          "type": "string"
        }
      ]
    },
    {
      "name": "update",
      "accounts": [
        {
          "name": "quizAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "quiz",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "question",
          "type": "string"
        },
        {
          "name": "response",
          "type": "string"
        },
        {
          "name": "a1",
          "type": "string"
        },
        {
          "name": "a2",
          "type": "string"
        },
        {
          "name": "a3",
          "type": "string"
        },
        {
          "name": "a4",
          "type": "string"
        }
      ]
    },
    {
      "name": "answer",
      "accounts": [
        {
          "name": "quiz",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "response",
          "type": "string"
        }
      ]
    },
    {
      "name": "delete",
      "accounts": [
        {
          "name": "quizAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "quiz",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "question",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "quiz",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "isAnswered",
            "type": "bool"
          },
          {
            "name": "quizAuthor",
            "type": "publicKey"
          },
          {
            "name": "question",
            "type": "string"
          },
          {
            "name": "response",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "a1",
            "type": "string"
          },
          {
            "name": "a2",
            "type": "string"
          },
          {
            "name": "a3",
            "type": "string"
          },
          {
            "name": "a4",
            "type": "string"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "statistic",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "player",
            "type": "publicKey"
          },
          {
            "name": "correct",
            "type": "u64"
          },
          {
            "name": "incorrect",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "QuestionTooLong",
      "msg": "Cannot initialize, question too long"
    },
    {
      "code": 6001,
      "name": "AnswerTooLong",
      "msg": "Cannot initialize, answer too long"
    },
    {
      "code": 6002,
      "name": "AddressNotValid",
      "msg": "Address that created the quiz cannot answer it"
    },
    {
      "code": 6003,
      "name": "OwnerNotValid",
      "msg": "Only the quiz owner can modify its data"
    },
    {
      "code": 6004,
      "name": "IncorrectAnswer",
      "msg": "The provided answer is incorrect"
    }
  ]
};
