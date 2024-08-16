use anchor_lang::prelude::*;

#[error_code]
pub enum QuizError {
    #[msg("Cannot initialize, question too long")]
    QuestionTooLong,
    #[msg("Cannot initialize, answer too long")]
    AnswerTooLong,
    #[msg("Address that created cannot answer it")]
    AddressNotValid,
    #[msg("Only owner can modify its data")]
    OwnerNotValid,
    #[msg("The provided answer is incorrect")]
    IncorrectAnswer
}
