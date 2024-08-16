use anchor_lang::prelude::*;

#[account]
pub struct Quiz {
    pub is_answered: bool,
    pub quiz_author: Pubkey,
    pub question: String,
    pub response: [u8; 32],
    pub a_1: String,
    pub a_2: String,
    pub a_3: String,
    pub a_4: String,
    pub bump: u8,
}

#[account]
pub struct Statistic {
    pub player: Pubkey,
    pub correct: u64,
    pub incorrect: u64,
    pub bump: u8,
}

