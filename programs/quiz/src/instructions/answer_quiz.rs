use anchor_lang::prelude::*;
use crate::errors::QuizError;
use crate::states::Quiz;

pub fn answer_quiz(ctx: Context<AnswerQuizContext>, response: String)  -> Result<()> {
    let quiz = &mut ctx.accounts.quiz;
    let user = &mut ctx.accounts.user;

    require!(user.key() != quiz.quiz_author,
        QuizError::AddressNotValid);

    let provided_response = anchor_lang::solana_program::hash::hash(response.as_bytes()).to_bytes();
    require!(provided_response.as_ref() == quiz.response.as_ref(),
    QuizError::IncorrectAnswer);

    quiz.is_answered = true;
    Ok(())
}

#[derive(Accounts)]
pub struct AnswerQuizContext<'info> {
    #[account(mut)]
    pub quiz: Account<'info, Quiz>,
    #[account(mut)]
    pub user: Signer<'info>
}
