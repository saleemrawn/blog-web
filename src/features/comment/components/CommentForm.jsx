import { Form } from "radix-ui";
import { useState } from "react";
import { useParams } from "react-router";
import { useAuthContext } from "../../auth";
import { useCreateComment } from "../../comment";
import { Flex } from "@radix-ui/themes";

export const CommentForm = ({ onCommentCreated }) => {
  const [comment, setComment] = useState("");
  const { createComment, isLoading, error, resetError } = useCreateComment();
  const { user } = useAuthContext();
  const { postId } = useParams();
  const serverErrorMessages = error?.response?.data?.errors ?? [];
  const hasServerError = serverErrorMessages.length > 0;
  const authorId = Number(user?.id);
  const postIdNumber = Number(postId);

  const handleSubmit = async (event) => {
    event.preventDefault();
    resetError();

    try {
      await createComment({
        content: comment,
        authorId,
        postId: postIdNumber,
      });

      setComment("");
      onCommentCreated();
    } catch {}
  };

  return (
    <Form.Root onSubmit={handleSubmit} onClearServerErrors={resetError}>
      <Form.Field
        className="FormField"
        name="content"
        serverInvalid={hasServerError}
      >
        <Flex direction={"column"}>
          <Form.Message className="FormMessage" match="valueMissing">
            Comment is required
          </Form.Message>
          {serverErrorMessages.map((err, index) => (
            <Form.Message
              key={err.msg ?? index}
              className="FormMessage"
              forceMatch={hasServerError}
            >
              {err.msg}
            </Form.Message>
          ))}
          <Form.Control asChild>
            <textarea
              className="FormControl"
              aria-label="Add message"
              placeholder="Add message"
              onChange={(e) => {
                setComment(e.target.value);
                resetError();
              }}
              required
            ></textarea>
          </Form.Control>
        </Flex>
      </Form.Field>

      <Form.Submit asChild>
        <button className="Button">Post</button>
      </Form.Submit>
    </Form.Root>
  );
};
