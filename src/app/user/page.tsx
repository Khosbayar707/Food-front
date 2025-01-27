"use client";

export default function NewUser() {
  async function addUser() {
    const response = await fetch(`http://localhost:8000/user/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "Test@gmail.com",
        password: "12345678",
        phoneNumber: "88998899",
        address: "2024/12/СБД, 12-р хороо, СБД нэгдсэн эмнэлэг Sbd negdsen",
      }),
    });
  }
  return (
    <button
      className="cursor-pointer"
      onClick={() => {
        addUser();
      }}
    >
      User
    </button>
  );
}
