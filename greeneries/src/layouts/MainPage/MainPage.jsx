import React from "react";
import CarouselComponent from "../../Components/Carousel/CarouselComponent";
import CategoryList from "../../Components/Category/CategoryList";
import PlantCard from "../../Components/Plants/PlantCard";
import PlantCardList from "../../Components/Plants/PlantCardList";

const MainPage = () => {
  return (
    <>
      <main>
        <CarouselComponent />
        <CategoryList />
        <PlantCardList />
      </main>
    </>
  );
};

export default MainPage;
