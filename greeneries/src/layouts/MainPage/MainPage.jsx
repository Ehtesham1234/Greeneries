import React from "react";
import CarouselComponent from "../../Components/Carousel/CarouselComponent";
import CategoryList from "../../Components/Category/CategoryList";
import PlantCardList from "../../Components/Plants/PlantCardList";
import InfoCards from "../../Components/InfoCard/InfoCard";
import WeatherPlantList from "../../Components/Weatherbase/WeatherPlantList";
import BlogCardList from "../../Components/Blog/BlogCardList";

const MainPage = () => {
  return (
    <>
      <main>
        <CarouselComponent />
        <CategoryList />
        <PlantCardList />
        <InfoCards />
        <WeatherPlantList />
        <BlogCardList />

        {/* season flower plant after that trending then blog then company details and foolter */}
      </main>
    </>
  );
};

export default MainPage;
