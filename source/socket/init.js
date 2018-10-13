// Core
import io from 'socket.io-client';

export const socket = io('https://lab.lectrum.io', {
  path: '/react/ws',
})