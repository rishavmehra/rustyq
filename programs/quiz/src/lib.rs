use crate::instructions::*;
use anchor_lang::prelude::*;

pub mod errors;
pub mod states;
mod instructions;
mod constants;
declare_id!("GbvSraKaTa6pWGthuengwYqxAyFiqoKYPZt6qdL64UfG");

#[program]
pub mod quiz {
    use super::*;

    pub fn initialize(
        ctx: Context<InitializeQuiz>,
        question: String,
        response: String,
        a_1: String,
        a_2: String,
        a_3: String,
        a_4: String
    ) -> Result<()> {
        initialize_quiz(ctx, question, response, a_1, a_2, a_3, a_4)
    }

    pub fn update(
        ctx: Context<UpdateQuiz>,
        question: String,
        response: String,
        a_1: String,
        a_2: String,
        a_3: String,
        a_4: String
    ) -> Result<()> {
        update_quiz(ctx, question, response, a_1, a_2, a_3, a_4)
    }

    pub fn answer(
        ctx: Context<AnswerQuizContext>,
        response: String) -> Result<()> {
        answer_quiz(ctx, response)
    }

    pub fn delete(ctx: Context<DeleteQuizContext>, question: String) -> Result<()> {
        delete_quiz(ctx, question)
    }
}

