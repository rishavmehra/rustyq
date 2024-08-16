use anchor_lang::prelude::*;
use crate::constants::*;
use crate::states::*;

pub fn delete_quiz(_ctx: Context<DeleteQuizContext>, question: String) -> Result<()> {
    msg!("Quiz with question {} deleted", question);
    Ok(())
}

#[derive(Accounts)]
#[instruction(question: String)]
pub struct DeleteQuizContext<'info> {
    #[account(mut)]
    pub quiz_authority: Signer<'info>,
    #[account(
        mut,
        close=quiz_authority,
        seeds = [
            anchor_lang::solana_program::hash::hash(question.as_bytes()).to_bytes().as_ref(),
            QUIZ_SEED.as_bytes(),
            quiz_authority.key().as_ref()
        ],
        bump)]
    pub quiz: Account<'info, Quiz>,
}
