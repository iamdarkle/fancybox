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
                            <xsl:copy>
                                <xsl:apply-templates select="@*"/>
                                <xsl:attribute name="data-src">
                                    <xsl:value-of select="@url"/>
                                </xsl:attribute>
                                <xsl:apply-templates/>
                            </xsl:copy>
                        </a>
                    </xsl:when>
                    <xsl:otherwise>
                        <a data-fancybox="single" href="{@url}">
                            <xsl:copy>
                                <xsl:apply-templates select="@*"/>
                                <xsl:attribute name="data-src">
                                    <xsl:value-of select="@url"/>
                                </xsl:attribute>
                                <xsl:apply-templates/>
                            </xsl:copy>
                        </a>
                    </xsl:otherwise>
                </xsl:choose>
            XML;
        }
    }
}
