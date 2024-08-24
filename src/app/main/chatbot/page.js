"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigationbar from "@/components/Navigationbar";

export default function ChatbotUI() {
  const [messages, setMessages] = useState([
    { text: "Hi! How can I help you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "user" }]);
      setInput("");
      // Simulate bot response
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "This is a bot response!", sender: "bot" },
        ]);
      }, 1000);
    }
  };

  return (
    <>
      <Navigationbar />
      <div
        className="flex justify-center items-center bg-gray-100"
        style={{ height: "calc(100vh - 80px)" }}
      >
        <Card className="w-1/2 h-[600px] bg-white shadow-md rounded-lg overflow-hidden">
          <CardHeader>
            <CardTitle>Chatbot</CardTitle>
          </CardHeader>
          <div className="h-3/4 overflow-y-auto p-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-2 ${
                  message.sender === "user" ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`inline-block p-2 rounded-lg ${
                    message.sender === "user"
                      ? "bg-black text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          <div className="h-1/4 flex p-4 border-t border-gray-200">
            <Input
              className="flex-grow mr-2"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
            />
            <Button onClick={handleSend}>Send</Button>
          </div>
        </Card>
      </div>
    </>
  );
}
