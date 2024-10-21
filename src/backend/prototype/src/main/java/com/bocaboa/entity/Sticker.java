package com.bocaboa.entity;

import com.bocaboa.enums.StickerPaperTypeEnum;
import com.bocaboa.generic.entity.GenericEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "stickers")
public class Sticker extends GenericEntity {

    @Column(nullable = false)
    public String title;

    @Column(nullable = false)
    public int width;

    @Column(nullable = false)
    public int height;

    @Column(nullable = false)
    public StickerPaperTypeEnum paperType;

    @Column(nullable = false)
    public String format;

    @Column(nullable = false)
    public boolean ennoblement;

    @Column(nullable = false)
    public String extras;

    @Column(nullable = false)
    public int quantity;
}
