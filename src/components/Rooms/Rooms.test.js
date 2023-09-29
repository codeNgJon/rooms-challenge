import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Rooms from './Rooms';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter

describe('Rooms Component', () => {
  it('renders loading text when data is loading', () => {
    render(
      <Router>
        <Rooms />
      </Router>
    );
    const loadingText = screen.getByText('Loading...');
    expect(loadingText).toBeInTheDocument();
  });

  it('renders rooms when data is loaded', async () => {
    const mockRoomData = [
      {
        name: 'Room 1',
        spots: 3,
        thumbnail: 'room1.jpg',
      },
      {
        name: 'Room 2',
        spots: 5,
        thumbnail: 'room2.jpg',
      },
      {
        name: 'Room 3',
        spots: 0,
        thumbnail: 'room3.jpg',
      },
    ];

    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => ({ rooms: mockRoomData }),
    });

    render(
      <Router>
        <Rooms />
      </Router>
    );

    await waitFor(() => {
      const roomNames = screen.getAllByRole('room-item');
      screen.debug()
      expect(roomNames).toHaveLength(3);
      expect(roomNames[0]).toHaveTextContent('Room 1');
      expect(roomNames[1]).toHaveTextContent('Room 2');
      expect(roomNames[2]).toHaveTextContent('Room 3');
    });
  });
});
