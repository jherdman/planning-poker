'use client';

import { useId, useState } from "react";

export default function EstimationForm() {
    const estimationField = useId();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage("");

        try {
            const formData = new FormData(e.currentTarget);
            const estimation = formData.get("estimation");

            const response = await fetch("/api/estimations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ estimation }),
            });

            const result = await response.json();

            if (response.ok) {
                setMessage(`Estimation submitted: ${result.body.estimation}`);
                // Reset form
                const form = e.currentTarget;
                if (form) {
                    form.reset();
                }
            } else {
                setMessage("Error submitting estimation");
            }
        } catch (error) {
            setMessage("Error submitting estimation");
            console.error("Form submission error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Estimation Form</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor={estimationField} className="block text-sm font-medium mb-2">
                        My estimate
                    </label>
                    <input
                        type="number"
                        id={estimationField}
                        name="estimation"
                        className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Submitting..." : "Submit"}
                </button>
            </form>
            {message && (
                <div className="mt-4 p-3 bg-blue-100 text-blue-800 rounded-md">
                    {message}
                </div>
            )}
        </div>
    )
}
