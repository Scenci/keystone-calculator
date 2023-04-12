import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';

const KeystoneCalculator = ({ sortedRuns, seasonDungeons }) => {

  console.log("sortedRuns: ",sortedRuns);
  console.log("dungeons: ",seasonDungeons);

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log("submission data: ", data);
  };

  return (
    <div className="keystone-calculator">
      <form onSubmit={handleSubmit(onSubmit)}>
        {seasonDungeons.map((dungeon, index) => (
          <div key={index} className="dungeon-inputs">
            <label>{dungeon}</label>
            <input defaultValue="test" {...register("example")} />
           
            />
           
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default KeystoneCalculator;