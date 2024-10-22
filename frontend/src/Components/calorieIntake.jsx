import React, { useState } from 'react';

export default function CalorieIntake({ onSubmit, onComplete }){
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('male');
    const [activity, setActivity] = useState(1.2); // Default to sedentary

    const calculateBMR = () => {
        if (gender === 'male') {
            return 10 * weight + 6.25 * height - 5 * age + 5;
        } else {
            return 10 * weight + 6.25 * height - 5 * age - 161;
        }
    };

    const calculateTDEE = () => {
        const BMR = calculateBMR();
        return BMR * activity;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const dailyCalories = calculateTDEE();
        onSubmit(dailyCalories); // Pass calorie intake to SignUp component
        onComplete(); // Notify parent that calculation is complete
    };

    return (

        <form onSubmit={handleSubmit} >
            <h2>Calculate Your Daily Calorie Intake</h2>

            <div className="input-field">
                <input type="number" value={age} placeholder="Age" min="0" onChange={e => setAge(e.target.value)} required />
                {/* <label>Enter your age</label> */}
            </div>
            <div className="input-field">
                <input type="number" value={weight} placeholder="Weight (kg)" min="0" onChange={e => setWeight(e.target.value)} required />
                {/* <label>Enter your weight</label> */}
            </div>
            <div className="input-field">
                <input type="number" value={height} placeholder="Height (cm)" min="0" onChange={e => setHeight(e.target.value)} required />
                {/* <label>Enter your height</label> */}
            </div>
            <div>
                <select required value={gender} onChange={e => setGender(e.target.value)}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                
                <select value={activity} required onChange={e => setActivity(parseFloat(e.target.value))}>
                    <option value="1.2">Sedentary</option>
                    <option value="1.375">Lightly active</option>
                    <option value="1.55">Moderately active</option>
                    <option value="1.725">Very active</option>
                    <option value="1.9">Extra active</option>
                </select>
            </div>
            <div className="input-field">
                
                {/* <label>Select your activity level</label> */}
            </div>
            <button type="submit">Submit</button>

        </form>
    );
};
