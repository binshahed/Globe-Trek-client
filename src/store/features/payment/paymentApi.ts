import { baseApi } from "../../api/baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    makePayment: builder.mutation({
      query: (data) => ({
        url: "/auth/payment",
        method: "POST",
        body: data
      }),
      invalidatesTags: ["payment"]
    }),
    getPaymentDetails: builder.query({
      query: () => ({
        url: "/payment/getPaymentDetails?exclude=cash",
        method: "GET"
      }),

      providesTags: ["payment"]
    }),
    getAllPayments: builder.query({
      query: () => ({
        url: "/payment/all-payments",
        method: "GET"
      }),
      providesTags: ["payment"]
    })
  })
});

export const {
  useMakePaymentMutation,
  useGetPaymentDetailsQuery,
  useGetAllPaymentsQuery
} = paymentApi;
