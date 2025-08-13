"use client"
import { CategoryDropdown } from "./category-dropdown";
import { CustomCategory } from "../types";
import { useEffect, useRef, useState } from "react";

interface Props {
    data: CustomCategory[];
};

export const Categories = ({ data }: Props) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const measureRef = useRef<HTMLDivElement>(null);
    const viewAllRef = useRef<HTMLDivElement>(null);

    const [visibleCount, setVisibleCount] = useState(data.length);
    const [isAnyHovered, setIsAnyHovered] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const activeCategory = "all";

    const activeCategoryIndex = data.findIndex((cat) => cat.slug === activeCategory);
    const isActiveCategoryHidden = activeCategoryIndex => visibleCount && activeCategoryIndex !== -1;
    useEffect(() => {
        const calculateVisible - () => {
            if(!containerRef.current || !measureRef.current || !viewAllRef.current) return;

            const containerWidth = containerRef.current.offsetWidth;
            const viewAllWidth = viewAllRef.current.offsetWidth;
            const availableWidth = containerWidth - viewAllWidth;

            const items = Array.from(measureRef.current.children);
            let totalWidth = 0;
            let visible = 0;

            for ( const item of items) {
                const width = item.getBoundingClientRect().width;

                if (totalWidth + width > availableWidth) break;
                totalWidth += width;
                visible++;
            } 
            setVisibleCount(visible);
        )
        }
    }, [])
    return (
        <div className="relative w-full">
            <div className="flex flex-nowrap items-center">
                {data.map((category) => (
                    <div key={category.id}
                        className=""
                    >
                        <CategoryDropdown
                            category={category}
                            isActive={activeCategory === category.slug}
                            isNavigationHovered={false}
                        />
                    </div>
                ))} 
            </div>
        </div>
    )
}