import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy},
  { sendMail: sendMailSpy}
)
describe('Submit Feedback', () => {
  it('should be able to submit a feedback', async () => {

    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: "example feedback",
      screenshot: 'data:image/png;base64,gdgfdhf'
    })).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();

    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('should not be able to submit a feedback without type', async () => {
    await expect(submitFeedback.execute({
      type: '',
      comment: "example feedback",
      screenshot: 'data:image/png;base64,gdgfdhf'
    })).rejects.toThrow();
  });

  it('should not be able to submit a feedback without comment', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: "",
      screenshot: 'data:image/png;base64,gdgfdhf'
    })).rejects.toThrow();
  });

  it('should not be able to submit a feedback with this screenshot extension', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: "example feedback",
      screenshot: 'image.png'
    })).rejects.toThrow();
  });
});