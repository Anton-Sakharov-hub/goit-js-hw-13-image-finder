export default function (notice, message, delay) {
  notice({
    text: message,
    delay,
  });
}; 