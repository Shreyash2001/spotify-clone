const retry = async (fn, retries = 3, delay = 1000) => {
  let attempt = 0;
  while (attempt < retries) {
    try {
      return await fn();
    } catch (error) {
      attempt++;
      console.log(
        `Attempt ${attempt} failed. Retrying in ${delay}ms...`,
        error.message
      );
      if (attempt >= retries) {
        throw new Error("Max retries reached. Operation failed.");
      }
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
};

module.exports = { retry };
