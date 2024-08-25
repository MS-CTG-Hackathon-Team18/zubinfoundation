"use client";
import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigationbar from "@/components/Navigationbar";

export default function ChatbotUI() {
  const [messages, setMessages] = useState([
    { text: "Hi! How can I help you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = async () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "user" }]);

      const userInput = input;
      setInput("");

      try {
        const response = await fetch("http://localhost:8000/answer_question", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question: userInput }),
        });

        const data = await response.json();
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: data.result || "Sorry, I didn't understand that.",
            sender: "bot",
          },
        ]);
      } catch (error) {
        console.error("Error:", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "Error occurred. Please try again.", sender: "bot" },
        ]);
      }
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
          <CardHeader className="p-4">
            <CardTitle>Chatbot</CardTitle>
          </CardHeader>
          <div className="h-[460px] overflow-y-auto p-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-3 ${
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
            <div ref={messagesEndRef}> </div>
          </div>

          <div className="h-[80px] flex p-4 border-t border-gray-200">
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
