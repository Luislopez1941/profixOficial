"use client"

import { useState } from "react"
import users from "./json/users.json"
import "./Messages.css"
import Chat from "./chat/Chat"

const Page = () => {
  const [active, setActive] = useState<boolean>(false)
  const [selectedUser, setSelectedUser] = useState<number | null>(null)

  const handleUserClick = (index: number) => {
    setSelectedUser(index)
    setActive(true)
  }

  return (
    <div>
      {active ? (
        <Chat onBack={() => setActive(false)} />
      ) : (
        <div className="messages">
          <div className="row__one">{/* Header content can go here */}</div>
          <div className="messages__container">
            <div className="row__two">
              <div className="users__container">
                {users.map((user: any, index: number) => (
                  <div
                    className={`user ${selectedUser === index ? "active" : ""}`}
                    key={user.name}
                    onClick={() => handleUserClick(index)}
                  >
                    <div className="image_user">{/* User image can go here */}</div>
                    <div className="content">
                      <h3>{user.name}</h3>
                      <p>{user.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="row__three">{/* Footer content can go here */}</div>
        </div>
      )}
    </div>
  )
}

export default Page

