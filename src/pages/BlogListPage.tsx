import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, List, Typography, Modal, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { Post } from "../types";
import {
  fetchPosts,
  createPost,
  updatePost,
  deletePost,
} from "../hooks/postService";

const { Title } = Typography;

function BlogListPage() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const {
    data: posts,
    error,
    isLoading,
  } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const createPostMutation = useMutation({
    mutationFn: (newPost: Omit<Post, "id">) => createPost(newPost),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const updatePostMutation = useMutation({
    mutationFn: (updatedPost: Post) => updatePost(updatedPost),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: (postId: number) => deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const showModal = (post?: Post) => {
    setEditingPost(post || null);
    setIsModalVisible(true);
    if (post) {
      form.setFieldsValue(post);
    } else {
      form.resetFields();
    }
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (editingPost) {
        updatePostMutation.mutate({ ...editingPost, ...values });
      } else {
        createPostMutation.mutate(values);
      }
      setIsModalVisible(false);
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingPost(null);
  };

  const handleDelete = (postId: number) => {
    deletePostMutation.mutate(postId);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error)
    return <div>An error occurred: {error.message}</div>;

  return (
    <>
      <h1>Blog list</h1>
      <List
        itemLayout="horizontal"
        dataSource={posts}
        renderItem={(post) => (
          <List.Item
            actions={[
              <Button onClick={() => showModal(post)}>Edit</Button>,
              <Button onClick={() => handleDelete(post.id)} danger>
                Delete
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={
                <Link to={`/posts/${post.id}`}>
                  <Title level={4}>{post.title}</Title>
                </Link>
              }
              description={`Views: ${post.views}`}
            />
          </List.Item>
        )}
      />
      <Button type="primary" onClick={() => showModal()}>
        Add post
      </Button>
      <Modal
        title={editingPost ? "Edit Post" : "Add Post"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" name="postForm">
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please input the title!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="views"
            label="Views"
            rules={[{ required: true, message: "Please input the views!" }]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export { BlogListPage };
