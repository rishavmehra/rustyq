use anchor_lang::prelude::*;
use crate::constants::*;

use crate::errors::QuizError;
use crate::states::*;

pub fn update_quiz(
    ctx: Context<UpdateQuiz>,
    question: String,
    response: String,
    a_1: String,
    a_2: String,
    a_3: String,
    a_4: String) -> Result<()> {
    let quiz = &mut ctx.accounts.quiz; //pda
    let owner = ctx.accounts.quiz_authority.key();

    require!(
        quiz.quiz_author == owner,
        QuizError::OwnerNotValid
    );

    require!(
        (response.as_bytes().len() <= ANSWER_LENGTH || a_1.as_bytes().len() <= ANSWER_LENGTH || a_2.as_bytes().len() <= ANSWER_LENGTH || a_3.as_bytes().len() <= ANSWER_LENGTH || a_4.as_bytes().len() <= ANSWER_LENGTH),
        QuizError::AnswerTooLong
    );

    msg!("Quiz Updated");
    msg!("Question: {}", question);

    quiz.response = anchor_lang::solana_program::hash::hash(response.as_bytes()).to_bytes();
    quiz.a_1 = a_1;
    quiz.a_2 = a_2;
    quiz.a_3 = a_3;
    quiz.a_4 = a_4;

    Ok(())
}

#[derive(Accounts)]
#[instruction(question: String, response: String, a1: String, a2: String, a3: String, a4: String)]
pub struct UpdateQuiz<'info> {
    #[account(mut)]
    pub quiz_authority: Signer<'info>,
    #[account(
    mut,
    seeds = [
            anchor_lang::solana_program::hash::hash(question.as_bytes()).to_bytes().as_ref(),
            QUIZ_SEED.as_bytes(),
            quiz_authority.key().as_ref()
        ],
        bump,
    realloc = 8 + 1 + 1 + 32 + 32 + 4 + question.len() + 4 + a1.len() + 4 + a2.len() + 4 + a3.len() + 4 + a4.len(),
    realloc::payer = quiz_authority,
    realloc::zero = true,
        )]
    pub quiz: Account<'info, Quiz>,
    pub system_program: Program<'info, System>,
}
