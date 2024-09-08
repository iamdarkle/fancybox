<?php

namespace Darkle\Fancybox;

use s9e\TextFormatter\Configurator;

class DefineGalleryTemplate
{
    public function __invoke(Configurator $config)
    {
        $tag = $config->tags->add('FANCYBOX-GALLERY');
        $tag->template = '<div class="fancybox-gallery f-carousel"><xsl:apply-templates/></div>';

        $tag = $config->tags->add('FANCYBOX-GALLERY-ITEM');
        $tag->template = '<div class="f-carousel__slide"><xsl:apply-templates/></div>';

        if ($config->tags->exists('IMG')) {
            $tag = $config->tags->get('IMG');
            $newTemplate = $tag->template;
            $tag->template = <<<XML
                <xsl:choose>
                    <xsl:when test="parent::FANCYBOX-GALLERY-ITEM">
                        <a data-fancybox="gallery" href="{@url}">
                            <img src="{@url}" data-src="{@url}">
                                <xsl:copy-of select="@*"/>
                            </img>
                        </a>
                    </xsl:when>
                    <xsl:otherwise>
                        <a data-fancybox="single" href="{@url}">
                            <img src="{@url}" data-src="{@url}">
                                <xsl:copy-of select="@*"/>
                            </img>
                        </a>
                    </xsl:otherwise>
                </xsl:choose>
            XML;
        }
    }
}
