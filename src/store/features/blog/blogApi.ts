import { baseApi } from "../../api/baseApi";

const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBlog: builder.mutation({
      query: (data) => ({
        url: "/blog",
        method: "PATCH",
        body: data
      })
    })
  })
});

export const { useCreateBlogMutation } = blogApi;
