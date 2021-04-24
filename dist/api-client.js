const BASE_URL = "https://ds-todolist-api.herokuapp.com/todo";

// GET
const getData = async () => {
  try {
    const response = await fetch(BASE_URL, {
      method: "GET",
      headers: {},
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

// POST
const postData = async (data) => {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

// DELETE
const deleteData = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

// PUT/UPDATE
const putData = async (id, data) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
