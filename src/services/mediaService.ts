// Simulate an upload delay for realism
const SIMULATED_UPLOAD_DELAY = 1500;

export const mediaService = {
  /**
   * Uploads an image file and returns its URL.
   * Currently uses URL.createObjectURL to simulate a local upload.
   * To implement real uploads, replace the Promise body with an API call (e.g. to AWS S3, Cloudinary).
   */
  uploadImage: async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        return reject(new Error('Invalid file type. Please upload an image.'));
      }

      setTimeout(() => {
        try {
          const url = URL.createObjectURL(file);
          resolve(url);
        } catch (error) {
          reject(new Error('Failed to process image file.'));
        }
      }, SIMULATED_UPLOAD_DELAY);
    });
  },

  /**
   * Uploads a video file and returns its URL.
   * Currently uses URL.createObjectURL to simulate a local upload.
   * To implement real uploads, replace the Promise body with an API call.
   */
  uploadVideo: async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      // Validate file type
      if (!file.type.startsWith('video/')) {
        return reject(new Error('Invalid file type. Please upload a video.'));
      }

      setTimeout(() => {
        try {
          const url = URL.createObjectURL(file);
          resolve(url);
        } catch (error) {
          reject(new Error('Failed to process video file.'));
        }
      }, SIMULATED_UPLOAD_DELAY);
    });
  }
};
