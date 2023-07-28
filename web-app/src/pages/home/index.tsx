import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useGetLessons } from '../../hooks/api/lesson';
import { useCreateBooking, useGetBookings } from '../../hooks/api/booking';
import './home.css';
import { convertDateToTimeString } from '../../util/dates';
import { getCurrentUser } from '../../util/auth';

export default function HomePage() {
  const getLessonsQuery = useGetLessons();
  const getBookingsQuery = useGetBookings({
    userId: parseInt(getCurrentUser()!.sub),
    // date: new Date(),
  });
  const createBookingMutation = useCreateBooking();
  const lessons = getLessonsQuery.data ?? [];

  const handleLessonTimeClick = (id: number, date: string) => {
    createBookingMutation.mutate({ lessonId: id });
    alert(`Has reservado la clase a las ${date}.`);
  };

  return (
    <Box maxWidth={300} mx="auto" my={2}>
      <div className="lesson-times-container">
        <h2>Clases de mañana</h2>
        <div className="lesson-times-list">
          {lessons.map((lesson) => {
            const isBooked = getBookingsQuery.data?.some(
              (booking) => booking.lessonId === lesson.id,
            );
            return (
              <Card key={lesson.id} className="lesson-card">
                <CardContent>
                  <Typography variant="h5" component="h2">
                    {`${convertDateToTimeString(new Date(lesson.startDate))} -
                  ${convertDateToTimeString(new Date(lesson.endDate))}`}
                  </Typography>
                  <Typography color="textSecondary">{lesson.type}</Typography>
                  <Box>
                    <Button
                      key={lesson.id}
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        handleLessonTimeClick(
                          lesson.id,
                          convertDateToTimeString(new Date(lesson.startDate)),
                        )
                      }
                      className="lesson-time-button"
                      disabled={isBooked}
                    >
                      {isBooked ? 'Reservada' : 'Reservar clase'}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </Box>
  );
}