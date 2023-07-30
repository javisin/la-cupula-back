import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import apiClient from '../../apiClient';
import { getCurrentUser } from '../../util/auth';

interface GetBookingsFilter {
  userId?: number;
  date?: Date;
}
interface Booking {
  userId: number;
  lessonId: number;
}

export function useGetBookings(filter: GetBookingsFilter) {
  const { userId, date } = filter;
  const params = new URLSearchParams();
  if (userId) {
    params.set('userId', userId.toString());
  }

  if (date) {
    params.set('date', date.toISOString().slice(0, 10));
  }

  return useQuery(['booked-lessons', params.toString()], async () => {
    const { data } = await apiClient.get<Booking[]>(`bookings?${params.toString()}`);
    return data;
  });
}

export function useCreateBooking() {
  const queryClient = useQueryClient();
  const user = getCurrentUser();
  return useMutation(
    async ({ lessonId }: { lessonId: number }) => {
      const { data } = await apiClient.post<string>(`/bookings`, { userId: user?.sub, lessonId });
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['booked-lessons']);
      },
    },
  );
}
