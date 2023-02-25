import { useMutation, useQuery } from "react-query";

async function fetchComments(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  return response.json();
}

async function deletePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "DELETE" }
  );
  return response.json();
}

async function updatePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "PATCH", data: { title: "REACT QUERY FOREVER!!!!" } }
  );
  return response.json();
}

export function PostDetail({ post }) {
  // replace with useQuery
  const { data, isLoading, isError, error } = useQuery(
    ["comments", post.id],
    () => fetchComments(post.id)
  );
  const deleteMutation = useMutation(() => deletePost(post.id));
  const updateMutation = useMutation(() => updatePost(post.id));
  if (isLoading) return <h4>Loading...</h4>;
  if (isError)
    return (
      <>
        <h4>Oops, something went wrong..</h4>
        <p>{error.toString()}</p>
      </>
    );
  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button>
      {deleteMutation.isLoading && (
        <h4 style={{ color: "brown" }}>deleting...post</h4>
      )}
      {deleteMutation.isError && (
        <h4 style={{ color: "red" }}>Error deleting post..</h4>
      )}
      {deleteMutation.isSuccess && (
        <h4 style={{ color: "green" }}>deleted post successfully.</h4>
      )}{" "}
      <button onClick={() => updateMutation.mutate(post.id)}>
        Update title
      </button>
      {updateMutation.isLoading && (
        <h4 style={{ color: "yellow" }}>updation is goin on...</h4>
      )}
      {updateMutation.isError && (
        <h4 style={{ color: "red" }}>updation went wrong..</h4>
      )}
      {updateMutation.isSuccess && (
        <h4 style={{ color: "green" }}>Updated successfully..</h4>
      )}
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
