use anchor_lang::prelude::*;
use crate::constants::*;

use crate::errors::QuizError;
use crate::states::*;

pub fn initialize_quiz(
    ctx: Context<InitializeQuiz>,
    question: String,
    response: String,
    a_1: String,
    a_2: String,
    a_3: String,
    a_4: String) -> Result<()> {
    let initialized_quiz = &mut ctx.accounts.quiz; //pda

    require!(
        question.as_bytes().len() <= QUESTION_LENGTH,
        QuizError::QuestionTooLong
    );

    require!(
        (response.as_bytes().len() <= ANSWER_LENGTH || a_1.as_bytes().len() <= ANSWER_LENGTH || a_2.as_bytes().len() <= ANSWER_LENGTH || a_3.as_bytes().len() <= ANSWER_LENGTH || a_4.as_bytes().len() <= ANSWER_LENGTH),
        QuizError::AnswerTooLong
    );

    msg!("Quiz Created");
    msg!("Question: {}", question);

    initialized_quiz.question = question;
    initialized_quiz.response = anchor_lang::solana_program::hash::hash(response.as_bytes()).to_bytes();
    initialized_quiz.a_1 = a_1;
    initialized_quiz.a_2 = a_2;
    initialized_quiz.a_3 = a_3;
    initialized_quiz.a_4 = a_4;
    initialized_quiz.quiz_author = ctx.accounts.quiz_authority.key();
    initialized_quiz.bump = ctx.bumps.quiz;
    initialized_quiz.is_answered = false;

    Ok(())
}

// discriminator + bump + bool + pubKey + hash_response + 4 + ...len
#[derive(Accounts)]
#[instruction(question: String, response: String, a1: String, a2: String, a3: String, a4: String,)]
pub struct InitializeQuiz<'info> {
    #[account(mut)]
    pub quiz_authority: Signer<'info>,
    #[account(
    init,
    payer = quiz_authority,
    space = 8 + 1 + 1 + 32 + 32 + 4 + question.len() + 4 + a1.len() + 4 + a2.len() + 4 + a3.len() + 4 + a4.len(),
    seeds = [
        anchor_lang::solana_program::hash::hash(question.as_bytes()).to_bytes().as_ref(),
        QUIZ_SEED.as_bytes(),
        quiz_authority.key().as_ref()
        ],
        bump)]
    pub quiz: Account<'info, Quiz>,
    pub system_program: Program<'info, System>,
}
