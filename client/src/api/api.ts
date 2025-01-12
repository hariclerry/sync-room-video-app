export const generateToken = async (userId: string | undefined) => {

    const res = await fetch('https://sync-room-video-app-1.onrender.com/generate-token', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify({userId: userId})
    })
    const data = res.json();
    return data;
  };
