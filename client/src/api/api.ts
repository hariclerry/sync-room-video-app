export const generateToken = async (userId: string | undefined) => {

    const res = await fetch('http://localhost:8080/generate-token', {
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
